import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import RatingStar from "./RatingStar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

import BookSectionTitle from "./BookSectionTitle";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const ratingStar = [4, 3, 2, 1, 0];

const FilterSidebar = ({
  categoriesName,
  AuthorData,
  publicationName,
  categoryError,
  authorError,
  handleAuthorChange,
  handlePublisherChange,
  handleApplyFilters,
  handleCategoryChange,
  setDateRange,
  setPriceRange,
  setSelectedRating,
  setSelectedCategories,
  setSelectedAuthors,
  setSelectedPublishers,
  selectedPublishers,
  selectedAuthors,
  selectedCategories,
  selectedRating,
  priceRange,
  dateRange,
  // setFilteredBooks,
}) => {
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedAuthors([]);
    setSelectedPublishers([]);
    setDateRange([null, null]);
    setPriceRange([0, 1000]);
    setSelectedRating(null);
  };
  // useEffect(() => {
  //   const categories = searchParams.get("categories");
  //   const authors = searchParams.get("authors");
  //   const publishers = searchParams.get("publishers");
  //   const startDate = searchParams.get("startDate");
  //   const endDate = searchParams.get("endDate");
  //   const priceMin = searchParams.get("priceMin");
  //   const priceMax = searchParams.get("priceMax");
  //   const rating = searchParams.get("rating");

  //   if (searchParams) {
  //     setSelectedCategories(categories ? categories.split(",") : []);
  //     setSelectedAuthors(authors ? authors.split(",") : []);
  //     setSelectedPublishers(publishers ? publishers.split(",") : []);
  //     setDateRange([
  //       startDate ? new Date(startDate) : null,
  //       endDate ? new Date(endDate) : null,
  //     ]);
  //     setPriceRange([
  //       priceMin ? parseFloat(priceMin) : 0,
  //       priceMax ? parseFloat(priceMax) : 1000,
  //     ]);
  //     setSelectedRating(rating);
  //   }

  //   console.log({
  //     categories,
  //     authors,
  //     publishers,
  //     startDate,
  //     endDate,
  //     priceMin,
  //     priceMax,
  //     rating,
  //   });
  // }, [
  //   searchParams,
  //   setSelectedCategories,
  //   setSelectedAuthors,
  //   setSelectedPublishers,
  //   setDateRange,
  //   setPriceRange,
  //   setSelectedRating,
  // ]);

  if (authorError) {
    return (
      <div className="text-red-500">
        Error loading authors. Please try again later.
      </div>
    );
  }
  if (categoryError) {
    return (
      <div className="text-red-500">
        Error loading categories. Please try again later.
      </div>
    );
  }

  return (
    <section className="relative flex h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] min-w-full flex-col border-r p-5 shadow-sm md:min-w-80 md:max-w-min">
      <BookSectionTitle title={"Filter"} />

      <div className="yellow-scrollbar overflow-y-auto overflow-x-hidden">
        <div>
          {/* Category/Genre Section */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold text-primary-foreground hover:no-underline">
                Category/Genre
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-3">
                  {categoriesName?.map((category, idx) => (
                    <div className="flex gap-2 text-left" key={idx}>
                      <Checkbox
                        className="h-4 w-4 rounded shadow-none hover:bg-primary"
                        id={`category-${idx}`}
                        checked={selectedCategories.includes(category.Genre)}
                        onCheckedChange={() =>
                          handleCategoryChange(category.Genre)
                        }
                      />
                      <p>{category.Genre}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Author Section */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-primary-foreground hover:font-bold hover:no-underline">
                Author
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-3">
                  {AuthorData?.map((author, idx) => (
                    <div className="flex gap-2 text-left" key={idx}>
                      <Checkbox
                        className="h-4 w-4 rounded shadow-none hover:bg-primary"
                        id={`authors-${author._id}`}
                        checked={selectedAuthors.includes(author.name)}
                        onCheckedChange={() => handleAuthorChange(author.name)}
                      />
                      <p>{author.name}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Publisher Section */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-primary-foreground hover:font-bold hover:no-underline">
                Publisher
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-3">
                  {publicationName?.PublicationName?.map((publisher, idx) => (
                    <div className="flex gap-2 text-left" key={idx}>
                      <Checkbox
                        className="h-4 w-4 rounded shadow-none hover:bg-primary"
                        id={`books-${idx}`}
                        checked={selectedPublishers.includes(publisher)}
                        onCheckedChange={() => handlePublisherChange(publisher)}
                      />
                      <p>{publisher}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="mb-3 pt-5">
          <h2 className="pb-3 text-sm font-medium text-primary-foreground hover:font-bold hover:no-underline">
            Ratings
          </h2>
          <div>
            <RadioGroup
              value={selectedRating}
              onValueChange={setSelectedRating}
            >
              <div className="grid grid-cols-2 gap-1 font-semibold">
                {ratingStar.map((star) => (
                  <div className="flex items-center gap-2" key={star}>
                    <RadioGroupItem
                      className="checked:bg-primary hover:bg-primary"
                      value={star.toString()}
                      id={`rating-${star}`}
                    />
                    <div className="flex flex-col gap-1">
                      <RatingStar rating={star} />
                      <span className="text-sm font-normal">
                        {star}.00 - 5.00
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="mb-3">
          <h2 className="pb-3 text-sm font-medium text-primary-foreground hover:font-bold hover:no-underline">
            Date Range
          </h2>

          <div className="flex w-full flex-col gap-1">
            <DatePicker
              selectsRange
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(update) => setDateRange(update)}
              isClearable
              dateFormat="d MMM, yy"
              placeholderText="Select a range"
              className="min-w-full rounded-md border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>

        <div className="mb-0">
          <h2 className="pb-3 text-sm font-medium text-primary-foreground hover:font-bold hover:no-underline">
            Price Range:
          </h2>
          <div className="mt-0 px-5">
            <Slider
              range
              min={0}
              max={1000}
              value={priceRange}
              onChange={(range) => setPriceRange(range)}
            />
          </div>
          <div className="flex justify-between px-2 pt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-4 flex flex-1 items-end gap-2">
        <Button
          className="bg-gray-300 hover:bg-primary-foreground hover:text-white"
          onClick={resetFilters}
        >
          Reset Filter
        </Button>
        <Button className="w-full" onClick={handleApplyFilters}>
          Apply
        </Button>
      </div>
    </section>
  );
};

export default FilterSidebar;
