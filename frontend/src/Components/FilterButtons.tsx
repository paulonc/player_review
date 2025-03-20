import { Button } from "@/components/ui/button";

const filterOptions = [
  { label: "Latest", value: "latest" },
  { label: "Highest Rated", value: "highest-rated" },
  { label: "Most Reviewed", value: "most-reviewed" },
];

const FilterButtons = () => (
  <div className="flex gap-2 justify-end">
    {filterOptions.map((filter) => (
      <Button
        key={filter.value}
        variant="outline"
        size="sm"
        className="border-primary/20 hover:bg-primary/10 transition-all duration-300"
      >
        {filter.label}
      </Button>
    ))}
  </div>
);

export default FilterButtons;
