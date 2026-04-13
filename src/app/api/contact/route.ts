import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const message = body.message?.trim() || "";
    const subject = body.subject?.trim() || "Contato pelo portfólio";

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
          message: message,
          subject: subject,
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

      return NextResponse.json(
        { message: `Falha no provedor de e-mail: ${errorText}` },
        { status: 500 }
      );
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