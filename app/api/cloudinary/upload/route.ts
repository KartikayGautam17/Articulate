import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const response: {
    form: FormData;
  } = await req.json();
  const data = response.form.get("imageFile");
  return NextResponse.json({ file: data });
};
