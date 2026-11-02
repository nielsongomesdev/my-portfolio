import { NextResponse } from "next/server";

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  subject?: unknown;
  website?: unknown;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 10_000;
const MAX_LINE_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5_000;

const json = (message: string, status: number) => NextResponse.json({ message }, { status });

const singleLine = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "";

const multiLine = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const isSameOrigin = (request: Request) => {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json("Origem não permitida.", 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json("Formato inválido.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return json("Mensagem muito longa.", 413);
  }

  let body: ContactBody;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
      return json("Mensagem muito longa.", 413);
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json("Formato inválido.", 400);
    }
    body = parsed as ContactBody;
  } catch {
    return json("Formato inválido.", 400);
  }

  if (singleLine(body.website, MAX_LINE_LENGTH)) {
    return json("Mensagem enviada com sucesso.", 200);
  }

  const name = singleLine(body.name, MAX_LINE_LENGTH);
  const email = singleLine(body.email, MAX_LINE_LENGTH);
  const subject = singleLine(body.subject, MAX_LINE_LENGTH) || "Contato pelo portfólio";
  const message = multiLine(body.message, MAX_MESSAGE_LENGTH);

  if (!name || !email || !message) {
    return json("Preencha nome, e-mail e mensagem.", 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    return json("E-mail inválido.", 400);
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error("Contact route error: missing EmailJS environment variables.");
    return json("Não foi possível enviar a mensagem agora.", 503);
  }

  try {
    const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          user_name: name,
          user_email: email,
          message,
          subject,
        },
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!emailJsResponse.ok) {
      console.error("EmailJS error:", emailJsResponse.status, await emailJsResponse.text());
      return json("Não foi possível enviar a mensagem agora.", 502);
    }

    return json("Mensagem enviada com sucesso.", 200);
  } catch (error) {
    console.error("Contact route error:", error);
    return json("Não foi possível enviar a mensagem agora.", 502);
  }
}
