import React from 'react';

// A special constant for the ellipsis
const DOTS = '...';

/**
 * A helper function to generate a range of numbers.
 * @param {number} start - The starting number of the range.
 * @param {number} end - The ending number of the range.
 * @returns {number[]} - An array of numbers within the specified range.
 */
const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {

  // The logic for creating the pagination bar is memoized to avoid re-calculation on every render.
  const paginationRange = React.useMemo(() => {
    // We want to show 5 page numbers at a time, plus potential ellipses.
    const totalPageNumbers = 5;

    // Case 1: If the total number of pages is less than the numbers we want to show,
    // we just return the whole range.
    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

    // We do not want to show dots if it would only hide one page number.
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 2: No left dots to show, but right dots are needed.
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }

    // Case 3: No right dots to show, but left dots are needed.
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4: Both left and right dots are needed.
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [currentPage, totalPages]);

  // If there are no pages or only one page, we don't render the component.
  if (totalPages <= 1) {
    return null;
  }
  
  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex justify-center items-center mt-10 space-x-2 text-white">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="border border-gray-600 bg-zinc-800 px-4 py-2 rounded font-bold hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;&lt; Prev
      </button>

      {/* Page Number Buttons */}
      {paginationRange.map((pageNumber, index) => {
        // If the page number is an ellipsis, render it as a non-clickable span.
        if (pageNumber === DOTS) {
          return <span key={index} className="px-4 py-2">&#8230;</span>;
        }

        const isActive = pageNumber === currentPage;
        
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(pageNumber)}
            className={`border px-4 py-2 rounded font-bold ${
              isActive
                ? 'bg-red-600 border-red-600 text-white'
                : 'border-gray-600 bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="border border-gray-600 bg-zinc-800 px-4 py-2 rounded font-bold hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;