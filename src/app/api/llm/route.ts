import { NextRequest, NextResponse } from "next/server";

/**
 * /api/llm — Phase 9 预留接口骨架
 * 当前仅做环境变量校验与基本响应
 */
export async function POST(req: NextRequest) {
  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "LLM_API_KEY 未配置" },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.message !== "string") {
    return NextResponse.json(
      { error: "请求体需包含 message 字段" },
      { status: 400 }
    );
  }

  // Phase 9 接入真实 LLM
  return NextResponse.json({ reply: "（LLM 接口预留）" });
}
