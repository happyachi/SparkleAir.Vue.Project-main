import httpInstance from "@/utils/http";

export function getAllAirport() {
  return httpInstance({
    url: `Airport/GetAll`,
  });
}

export function getByIdAirport(id) {
  return httpInstance({
    url: `Airport/Get/${id}`,
  });
}
