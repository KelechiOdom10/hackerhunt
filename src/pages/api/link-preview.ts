import { NextApiResponse, NextApiRequest } from "next";
import { getLinkPreview } from "link-preview-js";

const headers = [
  { key: "Access-Control-Allow-Credentials", value: "true" },
  { key: "Access-Control-Allow-Origin", value: "*" },
  {
    key: "Access-Control-Allow-Methods",
    value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  },
  {
    key: "Access-Control-Allow-Headers",
    value:
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  },
];

export default async function linkPreviewHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  try {
    const data = await getLinkPreview(Array.isArray(url) ? url[0] : url, {
      timeout: 3000,
      headers: {
        "user-agent": "googlebot",
      },
    });
    headers.forEach(({ key, value }) => {
      res.setHeader(key, value);
    });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
