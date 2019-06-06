import request from "@/utils/request";
export function getDetail(id) {
  return request(`/topic/${id}`, {
    method: "get"
  });
}
