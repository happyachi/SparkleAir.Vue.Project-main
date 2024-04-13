import httpInstance from "@/utils/http";

export const LoginByTicketAndNameApi = ({ BookRef, FirstName, LastName }) => {
  return httpInstance({
    method: "post",
    url: "Tickets/loginByTicketAndName",
    data: {
      BookRef,
      FirstName,
      LastName,
    },
  });
};

export const GetAirFlightListByMemberId = (memberId) => {
  return httpInstance({
    method: "get",
    url: `Tickets/GetAirFlightListByMemberId?memberId=${memberId}`,
  });
};

export const GetPassengerByMemberIdAndFlightId = (memberId, flightId) => {
  return httpInstance({
    method: "get",
    url: `Tickets/GetPassengerByMemberIdAndFlightId?memberId=${memberId}&flightId=${flightId}`,
  });
};

export const GetTicketInfoByTicketInvoicingDetailsId = (
  ticketInvoicingDetailsId
) => {
  return httpInstance({
    method: "get",
    url: `Tickets/GetTicketInfoByTicketInvoicingDetailsId?ticketInvoicingDetailsId=${ticketInvoicingDetailsId}`,
  });
};

export const GetLuggageListByTicketInvoicingDetailsId = (
  ticketInvoicingDetailsId
) => {
  return httpInstance({
    method: "get",
    url: `Tickets/GetLuggageListByTicketInvoicingDetailsId?ticketInvoicingDetailsId=${ticketInvoicingDetailsId}`,
  });
};

export const GetTicketByMemberIdAndFlightId = (memberId, flightId) => {
  return httpInstance({
    method: "get",
    url: `Tickets/GetTicketByMemberIdAndFlightId?memberId=${memberId}&flightId=${flightId}`,
  });
};
