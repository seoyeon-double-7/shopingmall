// url 파싱해서, 현재 페이지 정보 알려주기

function parseRequestUrl() {
  const url = document.location.hash.toLowerCase();

  const request = url.split("/");
  return request[2] == "search"
    ? { resource: request[1], action: request[2], key: request[3] }
    : { resource: request[1], id: request[2], cnt: request[3] };
}
export default parseRequestUrl;
