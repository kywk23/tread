import { NextResponse } from "next/server";
import Threads_Contents_Like from "@/app/models/Threads_Contents_Like";

export async function GET(res, { params: { threadContentId } }) {
  try {
    const user = await Threads_Contents_Like.findAll({
      where: { threadsContentsId: threadContentId },
    });

    if (!user) {
      return NextResponse.json({ error: true, msg: `user not found` });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: true, msg: `server error` });
  }
}
