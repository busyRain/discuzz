import request from "@/utils/request";
export function getBlockTop(data) {
  return request(`/topic/${data.id}`, {
    method: "get",
    params: data
  });
}
