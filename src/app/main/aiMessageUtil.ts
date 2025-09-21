async function getRating(message: string) {
  const res = await fetch("/api/rating", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error(`Error ${res.status}`);
  return await res.json(); // because your rate endpoint returns JSON
}
async function getRebuttal(message:string, history?:string[]) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  return await res.text(); 
}

export {getRebuttal, getRating};