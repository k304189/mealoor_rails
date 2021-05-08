import { memo, VFC } from "react";
import ReactPaginate from "react-paginate";

type Props = {
  dataNum: number;
  onPageChange: (page: { selected: number }) => void;
  displayNum?: number;
  previousLabel?: string;
  nextLabel?: string;
  breakLabel?: string;
  marginPagesDisplayed?: number;
  pageRangeDisplayed?: number;
};

export const DefaultPaging: VFC<Props> = memo((props) => {
  const {
    dataNum,
    onPageChange,
    displayNum = 10,
    previousLabel = "<",
    nextLabel = ">",
    breakLabel = "...",
    marginPagesDisplayed = 1,
    pageRangeDisplayed = 4,
  } = props;

  return (
    <ReactPaginate
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      breakLabel={breakLabel}
      pageCount={Math.ceil(dataNum / displayNum)}
      marginPagesDisplayed={marginPagesDisplayed}
      pageRangeDisplayed={pageRangeDisplayed}
      onPageChange={onPageChange}
      containerClassName="pagination"
    />
  );
});
