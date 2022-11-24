import { readerToResponse } from "./_reader-to-response.ts";

export async function readerToSearchParams(
  reader: ReadableStreamDefaultReader<Uint8Array>,
): Promise<URLSearchParams> {
  const response = readerToResponse(reader);

  const searchParams = decodeURIComponent(await response.text());

  return new URLSearchParams(searchParams);
}
