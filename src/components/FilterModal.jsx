import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import BookSectionTitle from "./BookSectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import RatingStar from "./RatingStar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS file for styling
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const ratingStar = [1, 2, 3, 4, 5];

const FilterModal = ({
  categoryName: categoriesName,
  booksData,
  AuthorData,
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);

  // Function to handle the filter action
  const handleFilter = () => {
    console.log("Selected Date Range:", dateRange);
    console.log("Selected Price Range:", priceRange);
    console.log("Selected Rating:", selectedRating);
    console.log("Selected Categories:", selectedCategories);
    console.log("Selected Authors:", selectedAuthors);
    console.log("Selected Publishers:", selectedPublishers);
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((category) => category !== value)
    );
  };

  const handleAuthorChange = (event) => {
    const { value, checked } = event.target;
    setSelectedAuthors((prev) =>
      checked ? [...prev, value] : prev.filter((author) => author !== value)
    );
  };

  const handlePublisherChange = (event) => {
    const { value, checked } = event.target;
    setSelectedPublishers((prev) =>
      checked
        ? [...prev, value]
        : prev.filter((publisher) => publisher !== value)
    );
  };

  return (
    <section>
      <Dialog className="">
        <DialogTrigger>
          <Button variant="secondary" size="lg" className="p-6">
            <IoFilter className="mr-2 size-4" />
            Filter
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-sm">
          <DialogHeader>
            <BookSectionTitle title={"Filter"} />
            <DialogDescription>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-primary-foreground hover:font-bold hover:no-underline">
                    Category/Genre
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-1">
                      {categoriesName?.map((categories, idx) => (
                        <div className="flex gap-2 text-left" key={idx}>
                          <Checkbox
                            id={`category-${idx}`}
                            value={categories.Genre}
                            onChange={handleCategoryChange}
                          />
                          <p>{categories.Genre}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

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
                            id={`authors-${idx}`}
                            value={author.name}
                            onChange={handleAuthorChange}
                          />
                          <p>{author.name}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

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
                            id={`books-${idx}`}
                            value={book.PublicationName}
                            onChange={handlePublisherChange}
                          />
                          <p>{book.PublicationName}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex justify-between gap-5 rounded-sm border border-primary p-5">
                <div>
                  <h2 className="w-fit pb-3 font-bold">Rating</h2>
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
                            <span className="text-[.5rem]">
                              {star - 1}.00 to {star}.99
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex-1 rounded-sm border border-primary p-2 text-left">
                  <h2 className="w-fit pb-2 font-bold">Date Range:</h2>
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    isClearable
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    placeholderText="Select date range"
                    className="rounded-sm p-2"
                  />
                  <hr className="my-5 border border-primary" />
                  <h2 className="w-fit pb-2 font-bold">Price Range:</h2>
                  <Slider
                    range
                    min={0}
                    max={1000} // Adjust max price as needed
                    value={priceRange}
                    onChange={(value) => setPriceRange(value)}
                  />
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex w-full">
                <Button className="w-full" onClick={handleFilter}>
                  Filter
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FilterModal;
