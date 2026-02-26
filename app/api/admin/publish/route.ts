import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  CopyRow,
  readCopyCsvRaw,
  readCopyRows,
  writeCopyRows,
} from "@/lib/copySheet";
import { publishCopySheetToBranch } from "@/lib/githubPublish";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = (await req.json().catch(() => ({}))) as {
    rows?: CopyRow[];
    commitMessage?: string;
    prTitle?: string;
    prBody?: string;
  };

  const rows = body.rows;
  if (rows) {
    await writeCopyRows(rows);
  } else {
    await readCopyRows();
  }

  const csvContent = await readCopyCsvRaw();
  const publish = await publishCopySheetToBranch({
    filePath: "content/copywriting-sheet.csv",
    fileContent: csvContent,
    commitMessage: body.commitMessage,
    prTitle: body.prTitle,
    prBody: body.prBody,
  });

  return NextResponse.json({
    ok: true,
    ...publish,
  });
}
