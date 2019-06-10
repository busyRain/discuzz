import request from "@/utils/request";
export function getBlockList(data) {
  return request("/topic/", {
    method: "get",
    params: data
  });
}
export function getBlockTop(data) {
  return request(`/section/${data}`, {
    method: "get"
  });
}
