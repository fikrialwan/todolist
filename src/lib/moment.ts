import moment from "moment";
import "moment/locale/id";

export const formatDate = (date: string) => {
  const momentId = moment(date).locale("id");
  return momentId.format("LL");
};
