import OpenAI from 'openai';

type Role = 'user' | 'assistant' | 'system'; 
type Turn = {role: Role, content: string};
const model = 'gpt-GPT-4.1'

const MAX_TURNS = 16;
const RECENT_REBUTTALS: string[] = [];

function rememberRebuttal(text: string) {
    if (!text?.trim()) return;
    RECENT_REBUTTALS.push(text.trim());
    if (RECENT_REBUTTALS.length > MAX_TURNS) RECENT_REBUTTALS.shift();
}

function normalizeHistory(history: unknown): Turn[] {
    if (!Array.isArray(history)) return [];
    const strings = (history as unknown[]).filter((s) => typeof s === "string" && s.trim().length > 0) as string[];
    const roles: Role[] = ["user", "assistant"];
    return strings.map<Turn>((content, i) => ({ role: roles[i % 2], content }));
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as {
            message?: string;      
            history?: string[];    
        };  

        const apiKey = process.env.OPENAI_API_KEY; //creating the OPENAI Client

        if (!body?.message || typeof body.message !== 'string') {return new Response("Invalid 'message' (string required)", { status: 400 });} //invalid message handling
        if (!apiKey) return new Response("Missing OPENAI_API_KEY in .env", { status: 500 }); //missing api key handling

        const client = new OpenAI({apiKey: apiKey}); 

        const prior: Turn[] = normalizeHistory(body.history);
        
        const system: Turn = {
            role: 'system',
            content: "You are a debate assistant. For a given opponent argument, identify problems and produce ONE counterargument supported by two credible sources. If you cannot find two sources, do not use that counterargument. Consider three possible counterarguments, compare them, and select the single best refutation not already presented. Do not include introductions, labels,  bullet points, sources, or explanations. Respond with the counter-argument text only and you should sound argumentative like you are really trying to dismantle the user's argument through like flaws in their logic, fallacies, and more. Do not limit yourself to just flaws in logic, fallacies, etc",
        }

        const memoryNote: Turn | null =
            RECENT_REBUTTALS.length > 0
            ? {
                role: "system",
                content:
                "Recent rebuttals (avoid repeating these ideas):\n- " +
                RECENT_REBUTTALS.slice(-MAX_TURNS).join("\n- "),
            }
            : null;

        const messages: Turn[] = [
            system,
            ...(memoryNote ? [memoryNote] : []),
            ...prior,
            { role: "user", content: body.message },
        ];

        const resp = await client.chat.completions.create({
            model: model,
            messages,
            temperature: 0.6,
            max_tokens: 800,
        });

        const rebuttal = resp.choices[0]?.message?.content?.trim() ?? "";

        if (rebuttal) rememberRebuttal(rebuttal);

        return new Response(rebuttal, {
            status: 200,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
    } catch (error:any) { //api pull error handling
        console.error('POST /api/chat error:', error);
        const msg = error?.error?.message || error?.message || (typeof error === "string" ? error : "Unknown error");
        return new Response(JSON.stringify({ error: msg }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

