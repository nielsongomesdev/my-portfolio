import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
  /** Honeypot field: real users never fill it in. */
  website?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 2000;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    // Bots that fill every field get a silent success and nothing is sent.
    if (body.website?.trim()) {
      return NextResponse.json({ message: "Mensagem enviada com sucesso." }, { status: 200 });
    }

    const name = body.name?.trim().slice(0, MAX_FIELD_LENGTH) || "";
    const email = body.email?.trim().slice(0, MAX_FIELD_LENGTH) || "";
    const message = body.message?.trim().slice(0, MAX_FIELD_LENGTH * 2) || "";
    const subject = body.subject?.trim().slice(0, MAX_FIELD_LENGTH) || "Contato pelo portfólio";

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Campos obrigatórios: name, email e message." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ message: "E-mail inválido." }, { status: 400 });
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      return NextResponse.json(
        { message: "Configuração de e-mail incompleta no servidor." },
        { status: 500 }
      );
    }

    const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    });

    if (!emailJsResponse.ok) {
      const errorText = await emailJsResponse.text();
      console.error("EmailJS error:", errorText);

      const normalizedError = errorText.toLowerCase();
      if (normalizedError.includes("non-browser environments is currently disabled")) {
        return NextResponse.json(
          {
            message:
              "No EmailJS, ative 'API access from non-browser environments' em Account > Security.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({ message: "Falha no provedor de e-mail." }, { status: 502 });
    }

    return NextResponse.json({ message: "Mensagem enviada com sucesso." }, { status: 200 });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { message: "Erro interno ao processar a solicitação." },
      { status: 500 }
    );
  }
}
