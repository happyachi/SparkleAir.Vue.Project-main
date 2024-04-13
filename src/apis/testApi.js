import httpInstance from "@/utils/http";

export function getAllMembers() {
  return httpInstance({
    url: "members",
  });
}
