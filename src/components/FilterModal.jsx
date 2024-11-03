import { useRouter } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoFilter } from "react-icons/io5";
import BookSectionTitle from "./BookSectionTitle";
import RatingStar from "./RatingStar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const rating = [0, 1, 2, 3, 4];
const ratingStar = rating.reverse();

const FilterModal = ({
  categoryName: categoriesName,
  booksData,
  AuthorData,
}) => {
  const router = useRouter();
  const [dateRange, setDateRange] = useState([null, null]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);

  const query = {
    categories: selectedCategories.join(","),
    authors: selectedAuthors.join(","),
    publishers: selectedPublishers.join(","),
    startDate: dateRange[0] ? dateRange[0].toISOString() : "",
    endDate: dateRange[1] ? dateRange[1].toISOString() : "",
    priceMin: priceRange[0],
    priceMax: priceRange[1],
    rating: selectedRating,
  };

  const handleFilter = () => {
    console.log("Filtering with query:", query);
    const queryString = new URLSearchParams(query).toString();
    router.push(`/all-books?${queryString}`);
  };

  const handleCategoryChange = (genre) => {
    setSelectedCategories((prev) =>
      prev.includes(genre)
        ? prev.filter((category) => category !== genre)
        : [...prev, genre]
    );
  };

  const handleAuthorChange = (authorName) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorName)
        ? prev.filter((author) => author !== authorName)
        : [...prev, authorName]
    );
  };

  const handlePublisherChange = (publisherName) => {
    setSelectedPublishers((prev) =>
      prev.includes(publisherName)
        ? prev.filter((publisher) => publisher !== publisherName)
        : [...prev, publisherName]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedAuthors([]);
    setSelectedPublishers([]);
    setDateRange([null, null]);
    setPriceRange([0, 1000]);
    setSelectedRating(null);
  };

  return (
    <section>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="lg"
            className="p-6 hover:bg-primary"
          >
            <IoFilter className="mr-2 size-4" />
            Filter
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-sm bg-white p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle>
              <BookSectionTitle title={"Filter"} />
            </DialogTitle>

            <div className="yellow-scrollbar max-h-[40vh] overflow-y-auto">
              <Accordion type="single" collapsible className="w-full">
                {/* Categories Section */}
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-normal text-primary-foreground hover:font-bold hover:no-underline">
                    Category/Genre
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-1">
                      {categoriesName?.map((category, idx) => (
                        <div className="flex gap-2 text-left" key={idx}>
                          <Checkbox
                            id={`category-${idx}`}
                            className="h-4 w-4 rounded shadow-none hover:bg-primary"
                            checked={selectedCategories.includes(
                              category.Genre
                            )}
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
                    <div className="grid grid-cols-3 gap-1">
                      {AuthorData?.map((author, idx) => (
                        <div className="flex gap-2 text-left" key={idx}>
                          <Checkbox
                            className="h-4 w-4 rounded shadow-none hover:bg-primary"
                            id={`authors-${idx}`}
                            checked={selectedAuthors.includes(author.name)}
                            onCheckedChange={() =>
                              handleAuthorChange(author.name)
                            }
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
                    <div className="grid grid-cols-3 gap-1">
                      {booksData?.map((book, idx) => (
                        <div className="flex gap-2 text-left" key={idx}>
                          <Checkbox
                            className="h-4 w-4 rounded shadow-none hover:bg-primary"
                            id={`books-${idx}`}
                            checked={selectedPublishers.includes(
                              book.PublicationName
                            )}
                            onCheckedChange={() =>
                              handlePublisherChange(book.PublicationName)
                            }
                          />
                          <p>{book.PublicationName}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Rating and Date/Price Range */}
            <div className="flex justify-between gap-5 p-5">
              <div>
                <h2 className="w-fit pb-3 text-sm font-bold text-primary-foreground">
                  Rating
                </h2>
                <RadioGroup
                  value={selectedRating}
                  onValueChange={setSelectedRating}
                >
                  <div className="flex flex-col gap-1 font-semibold">
                    {ratingStar.map((star) => (
                      <div className="flex items-center gap-2" key={star}>
                        <RadioGroupItem
                          value={star.toString()}
                          id={`rating ${star}`}
                        />
                        <div className="flex flex-col">
                          <RatingStar rating={star} />
                          <span className="text-[.5rem]">{star}.00 - 5.00</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div>
                <hr className="min-h-full border-l border-primary" />
              </div>
              <div className="flex-1 p-2 pt-0 text-left">
                <div className="flex w-full flex-col gap-1">
                  <h2 className="w-fit pb-3 text-sm font-bold text-primary-foreground">
                    Date Range:
                  </h2>
                  <DatePicker
                    selectsRange
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={(update) => setDateRange(update)}
                    isClearable
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select a range"
                    className="min-w-full rounded-md border border-gray-300 p-2"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="w-fit pb-3 text-sm font-bold text-primary-foreground">
                    Price Range:
                  </h2>
                  <div className="px-3">
                    <Slider
                      range
                      min={0}
                      max={1000}
                      step={1}
                      value={priceRange}
                      onChange={(value) => setPriceRange(value)}
                    />
                    <div className="flex justify-between pt-1">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Buttons for Applying or Resetting Filters */}
          <div className="mt-4 flex justify-between">
            <Button
              variant="primary"
              className="bg-primary"
              onClick={handleFilter}
            >
              Apply Filter
            </Button>
            <Button
              className="bg-gray-300 hover:bg-primary-foreground hover:text-white"
              onClick={resetFilters}
            >
              Reset Filter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FilterModal;
