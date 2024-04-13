import httpInstance from "@/utils/http";

export function getMileageDetail(id) {
    return httpInstance({
        url: `MileageDetail/Get/${id}`,
    });
}

export function ExpiredCreate() {
    return httpInstance({
        url: `MileageDetail/ExpiredCreate`,
    });
}