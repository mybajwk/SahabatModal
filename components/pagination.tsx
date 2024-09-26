import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import _ from "lodash";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

const paginationVariants = cva(
  "flex size-[28px] items-center justify-center font-lexend text-[11px] sm:size-[33px] sm:text-[13px] md:size-[38px] md:text-[18px]",
  {
    variants: {
      variant: {
        primary: "rounded-md",
        rounded: "rounded-full",
        compact: "",
      },
      control: {
        icon: "",
        text: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      control: "text",
    },
  }
);

interface PaginationProps extends VariantProps<typeof paginationVariants> {
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  loop?: boolean;
  prevButton?: ReactNode;
  nextButton?: ReactNode;
  fromZero?: boolean;
}

interface PaginationItemProps extends VariantProps<typeof paginationVariants> {
  page?: number | string;
  type: PaginationItemType;
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  loop: boolean;
  children?: ReactNode;
  fromZero?: boolean;
}

interface PaginationDropdownProps {
  currentPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  fromZero?: boolean;
}

interface PaginationItemsProps extends VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
  loop: boolean;
  fromZero?: boolean;
}

enum PaginationItemType {
  NEXT,
  PREV,
  DOTSLEFT,
  DOTSRIGHT,
  DEFAULT,
}

const PaginationItem: FC<PaginationItemProps> = ({
  page,
  type,
  currentPage,
  setPage,
  totalPages,
  variant,
  control,
  loop = false,
  children,
  fromZero,
}) => {
  let normalizedPage = currentPage;
  if (fromZero) {
    normalizedPage++;
  }
  const handleOnNext = () => {
    if (normalizedPage !== totalPages) {
      setPage((prev) => prev + 1);
      return;
    }

    if (loop) {
      if (fromZero) {
        setPage(0);
      } else {
        setPage(1);
      }
    }
  };

  const handleOnPrev = () => {
    if (normalizedPage !== 1) {
      setPage((prev) => prev - 1);
      return;
    }

    if (loop) {
      if (fromZero) {
        setPage(totalPages - 1);
      } else {
        setPage(totalPages);
      }
    }
  };

  const handelOnNumClick = (num: number) => {
    if (fromZero) {
      setPage(num - 1);
    } else {
      setPage(num);
    }
  };

  const mid = Math.ceil(totalPages / 2);
  const handleOnDotsRightClick = () => {
    if (normalizedPage >= mid) {
      if (fromZero) {
        setPage(totalPages - 1);
      } else {
        setPage(totalPages);
      }
    } else if (normalizedPage < mid) {
      if (fromZero) {
        setPage(mid - 1);
      } else {
        setPage(mid);
      }
    }
  };

  const handleOnDotsLeftClick = () => {
    if (normalizedPage <= mid) {
      if (fromZero) {
        setPage(0);
      } else {
        setPage(1);
      }
    } else if (normalizedPage > mid) {
      if (fromZero) {
        setPage(mid - 1);
      } else {
        setPage(mid);
      }
    }
  };

  if (type === PaginationItemType.DEFAULT) {
    return (
      <button
        onClick={() => handelOnNumClick(page as number)}
        className={cn(
          paginationVariants({
            variant: variant,
            className:
              normalizedPage === page
                ? "bg-[#F09B21] text-white hover:bg-[#F09B21]/90"
                : "bg-transparent text-white hover:bg-[#F2F2F2]/20",
          })
        )}
      >
        {page}
      </button>
    );
  }

  if (type === PaginationItemType.DOTSRIGHT) {
    return (
      <button
        onClick={handleOnDotsRightClick}
        className={cn(
          paginationVariants({
            variant: variant,
            className: "group bg-transparent text-white hover:bg-[#F2F2F2]/20",
          })
        )}
      >
        <ChevronsRight className="hidden size-4 group-hover:block md:size-5" />
        <p className="block group-hover:hidden">...</p>
      </button>
    );
  }

  if (type === PaginationItemType.DOTSLEFT) {
    return (
      <button
        onClick={handleOnDotsLeftClick}
        className={cn(
          paginationVariants({
            variant: variant,
            className: "group bg-transparent text-white hover:bg-[#F2F2F2]/20",
          })
        )}
      >
        <ChevronsLeft className="hidden size-4 group-hover:block md:size-5" />
        <p className="block group-hover:hidden">...</p>
      </button>
    );
  }

  if (type === PaginationItemType.PREV) {
    if (children) {
      return (
        <button disabled={normalizedPage === 1 && !loop} onClick={handleOnPrev}>
          {children}
        </button>
      );
    }
    if (control === "icon") {
      return (
        <button
          disabled={normalizedPage === 1 && !loop}
          onClick={handleOnPrev}
          className={cn(
            paginationVariants({
              variant: variant,
              className:
                "bg-transparent text-white hover:bg-[#F2F2F2]/20 disabled:cursor-not-allowed disabled:text-white/60",
            })
          )}
        >
          <ChevronLeftIcon className="size-4 md:size-5" />
        </button>
      );
    }
    if (control === "text") {
      return (
        <button
          disabled={normalizedPage === 1 && !loop}
          onClick={handleOnPrev}
          className={cn(
            paginationVariants({
              variant: variant,
              className:
                "mr-1 flex flex-row items-center gap-[2px] border-none bg-transparent px-2 font-[500] text-white hover:text-white/70 disabled:cursor-not-allowed disabled:text-white/60 md:mr-2",
            })
          )}
        >
          {/*<ChevronLeftIcon className="size-4 md:size-5" />*/}
          Prev
        </button>
      );
    }
  }

  if (type === PaginationItemType.NEXT) {
    if (children) {
      return (
        <button
          disabled={normalizedPage === totalPages && !loop}
          onClick={handleOnNext}
        >
          {children}
        </button>
      );
    }
    if (control === "icon") {
      return (
        <button
          disabled={normalizedPage === totalPages && !loop}
          onClick={handleOnNext}
          className={cn(
            paginationVariants({
              variant: variant,
              className:
                "disabled:[#101E57]/60 bg-transparent text-white hover:bg-[#F2F2F2]/20 disabled:cursor-not-allowed",
            })
          )}
        >
          <ChevronRightIcon className="size-4 md:size-5" />
        </button>
      );
    }
    if (control === "text") {
      return (
        <button
          disabled={normalizedPage === totalPages && !loop}
          onClick={handleOnNext}
          className={cn(
            paginationVariants({
              variant: variant,
              className:
                "mr-1 flex flex-row items-center gap-[2px] border-none bg-transparent px-2 font-[500] text-white hover:text-white/70 disabled:cursor-not-allowed disabled:text-white/60 md:mr-2",
            })
          )}
        >
          Next
          {/*<ChevronRightIcon className="size-4 md:size-5" />*/}
        </button>
      );
    }
  }
};

const PaginationDropdown: React.FC<PaginationDropdownProps> = ({
  currentPage,
  totalPages,
  setPage,
  fromZero,
}) => {
  const numArr = _.range(1, totalPages + 1);
  const handleClick = (value: string) => {
    if (fromZero) {
      setPage(parseInt(value) - 1);
    } else {
      setPage(parseInt(value));
    }
  };
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Select
        onValueChange={handleClick}
        defaultValue={currentPage.toString()}
        value={currentPage.toString()}
      >
        <SelectTrigger className="h-[30px] min-w-[60px] bg-transparent text-xs text-white ring-0 hover:bg-[#F2F2F2]/20 focus:ring-0 focus:ring-transparent focus:ring-offset-0 data-[state=open]:ring-0 sm:h-[35px] sm:w-[70px] sm:min-w-[70px] sm:text-base md:h-[40px] md:w-[80px] md:min-w-[80px] md:text-[20px]">
          <SelectValue placeholder={currentPage} />
        </SelectTrigger>
        <SelectContent className="h-52 min-w-[60px] bg-[#F2F2F2] text-white sm:min-w-[70px] md:min-w-[80px]">
          {numArr.map((num) => (
            <SelectItem
              value={`${num}`}
              key={num}
              className="flex flex-row items-center justify-between pl-12 focus:bg-[#101E57]/10"
            >
              {num}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/*<p className="font-anderson text-xs sm:text-base md:text-[20px]">*/}
      {/*  {`of ${totalPages}`}*/}
      {/*</p>*/}
    </div>
  );
};

const PaginationItems: FC<PaginationItemsProps> = ({
  currentPage,
  totalPages,
  setPage,
  variant,
  control,
  loop = false,
  fromZero,
}) => {
  let numArr;
  let page = currentPage;
  if (fromZero) {
    page++;
  }
  const totalPageNoInArray = 7 + 1;
  if (totalPageNoInArray >= totalPages) {
    numArr = _.range(1, totalPages + 1);
  } else {
    const leftSiblingsIndex = Math.max(page - 1, 1);
    const rightSiblingsIndex = Math.min(page + 1, totalPages);

    const showLeftDots = leftSiblingsIndex > 2;
    const showRightDots = rightSiblingsIndex < totalPages - 2;

    if (!showLeftDots && showRightDots) {
      const leftItemsCount = 3 + 2;
      const leftRange = _.range(1, leftItemsCount + 1);
      numArr = [...leftRange, "... ", totalPages];
    } else if (showLeftDots && !showRightDots) {
      const rightItemsCount = 3 + 2;
      const rightRange = _.range(
        totalPages - rightItemsCount + 1,
        totalPages + 1
      );
      numArr = [1, " ...", ...rightRange];
    } else {
      const middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
      numArr = [1, " ...", ...middleRange, "... ", totalPages];
    }
  }

  return (
    <>
      {numArr.map((num: string | number, index: number) => {
        if (num === "... ") {
          return (
            <PaginationItem
              currentPage={currentPage}
              key={index}
              type={PaginationItemType.DOTSRIGHT}
              setPage={setPage}
              totalPages={totalPages}
              variant={variant}
              control={control}
              loop={loop}
              fromZero={fromZero}
            />
          );
        } else if (num === " ...") {
          return (
            <PaginationItem
              currentPage={currentPage}
              key={index}
              type={PaginationItemType.DOTSLEFT}
              setPage={setPage}
              totalPages={totalPages}
              variant={variant}
              control={control}
              loop={loop}
              fromZero={fromZero}
            />
          );
        } else {
          return (
            <PaginationItem
              currentPage={currentPage}
              key={index}
              type={PaginationItemType.DEFAULT}
              page={num}
              setPage={setPage}
              totalPages={totalPages}
              variant={variant}
              control={control}
              loop={loop}
              fromZero={fromZero}
            />
          );
        }
      })}
    </>
  );
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  setPage,
  totalPages,
  variant,
  control = "text",
  loop = false,
  prevButton,
  nextButton,
  fromZero = false,
}) => {
  return (
    <div className="flex size-fit items-center justify-center gap-1 p-2 sm:gap-2 md:gap-[9px]">
      <PaginationItem
        currentPage={currentPage}
        type={PaginationItemType.PREV}
        setPage={setPage}
        totalPages={totalPages}
        variant={variant}
        control={control}
        loop={loop}
        fromZero={fromZero}
      >
        {prevButton}
      </PaginationItem>
      {variant === "compact" ? (
        <PaginationDropdown
          currentPage={currentPage}
          setPage={setPage}
          totalPages={totalPages}
          fromZero={fromZero}
        />
      ) : (
        <PaginationItems
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
          variant={variant}
          control={control}
          loop={loop}
          fromZero={fromZero}
        />
      )}

      <PaginationItem
        currentPage={currentPage}
        type={PaginationItemType.NEXT}
        setPage={setPage}
        totalPages={totalPages}
        variant={variant}
        control={control}
        loop={loop}
        fromZero={fromZero}
      >
        {nextButton}
      </PaginationItem>
    </div>
  );
};

export default Pagination;
