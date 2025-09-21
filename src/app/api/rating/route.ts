import OpenAI from "openai";

type Role = "user" | "assistant" | "system";
type Turn = { role: Role; content: string };
const model = "gpt-4o-mini";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
        message?: string; 
    };

    const apiKey = process.env.OPENAI_API_KEY;

    if (!body?.message || typeof body.message !== "string") {
        return new Response("Invalid 'message' (string required)", { status: 400 });
    }
    if (!apiKey) {
        return new Response("Missing OPENAI_API_KEY in .env", { status: 500 });
    }

    const client = new OpenAI({ apiKey });

    const system: Turn = {
        role: "system",
        content: `You are a debate judge that is completely unbiased. Rate the user's argument on a scale of 1 to 10 in three categories:
        - rhetoric (clarity and persuasiveness of style)
        - accuracy (factual correctness and use of evidence)
        - logic (soundness and consistency of reasoning)

        Respond ONLY with a valid JSON object, no text outside JSON, exactly in this shape:
        {
            "rhetoric": number,
            "accuracy": number,
            "logic": number
        }`,
    };

    const messages: Turn[] = [
        system,
        { role: "user", content: body.message },
    ];

    const resp = await client.chat.completions.create({
        model,
        messages,
        temperature: 0,
        max_tokens: 150,
        response_format: { type: "json_object" }, 
    });

    const raw = resp.choices[0]?.message?.content?.trim() ?? "{}";

    return new Response(raw, {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
        console.error("POST /api/rate error:", error);
        const msg =
        error?.error?.message ||
        error?.message ||
        (typeof error === "string" ? error : "Unknown error");
        return new Response(JSON.stringify({ error: msg }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
    });
  }
}
