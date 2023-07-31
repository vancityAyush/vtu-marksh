import { mediumId } from "@/lib/constants";

export default async function handler(req, res) {
  const data = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/" +
      mediumId
  );
  const json = await data.json();
  res.status(200).json(json);
}
