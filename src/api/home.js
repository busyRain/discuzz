import request from "@/utils/request";

export function getSwiperList() {
  return request("/", {
    method: "get"
  });
}
export function getTopiclist() {
  return request("/topic/gethottopiclist", {
    method: "get"
  });
}
export function getNewTopicList() {
  return request("/topic/getnewtopiclist", {
    method: "get"
  });
}
export function getList() {}
