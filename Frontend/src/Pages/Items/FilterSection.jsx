import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const FilterSection = () => {

    const [expendCleanliness, setExpendCleanliness] = useState(false);
    const [expendPrice, setExpendPrice] = useState(false);
    const [expendDiscount, setExpendDiscount] = useState(false);
    const [colorRadio, setColorRadio] = useState("");
    const [priceRadio, setPriceRadio] = useState("");
    const [discountRadio, setDiscountRadio] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const colors = [
        { name: "Red", hex: "#FF0000" },
        { name: "Green", hex: "#00FF00" },
        { name: "Blue", hex: "#0000FF" }];

    const price = [
        { name: "Below $50", value: "below_50" },
        { name: "$50 - $100", value: "50_100" },
        { name: "$100 - $200", value: "100_200" },
        { name: "$200 - $500", value: "200_500" },
        { name: "Above $500", value: "above_500" }];

    const brand = [
        { name: "Brand A", value: "brand_a" },
        { name: "Brand B", value: "brand_b" },
        { name: "Brand C", value: "brand_c" },
        { name: "Brand D", value: "brand_d" },
        { name: "Brand E", value: "brand_e" }];

    const discount = [
        { name: "No Discount", value: "no_discount" },
        { name: "10% - 20%", value: "10_20" },
        { name: "20% - 30%", value: "20_30" },
        { name: "30% - 50%", value: "30_50" },
        { name: "Above 50%", value: "above_50" }];

    const updateFilterParams = (e) => {
        const { value, name } = e;
        if (value) {
            searchParams.set(name, value);
        }
        else {
            searchParams.delete(name);
        }
        setSearchParams(searchParams);
    };

    useEffect(() => {
        clearAllFilter()
    }, [])

    const clearAllFilter = () => {
        console.log("ClearAllFilter")
        setColorRadio("");
        setPriceRadio("");
        setDiscountRadio("");
        searchParams.forEach((value, key) => {
            searchParams.delete(key)
        }
        );
        setSearchParams(searchParams);
    };


    return (
        <div className="-z-50 space-y-5">
            <div className="flex items-center justify-between h-[40px] px-9 lg:border-r-1">
                <p className="text-lg font-bold">Filter</p>
                <Button
                    size="small"
                    className="text-teal-600 cursor-pointer font-semibold "
                    onClick={clearAllFilter}
                >
                    Clear All
                </Button>
            </div>
            <Divider />

            <div className="px-9 space-y-6 py-4">
                <section>
                    <FormControl>
                        <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", color: "var(--primary-color)", paddingBottom: "3px" }} className="text-2xl font-semibold" id="cleanliness">Cleanliness</FormLabel>
                        <RadioGroup
                            aria-labelledby="cleanliness"
                            // defaultValue=""
                            value={colorRadio}
                            name="cleanliness"
                            onClick={(e) => {
                                const value = e.target.value;
                                setColorRadio((prev) => {
                                    const newValue = prev === value ? "" : value; 
                                    console.log(newValue)
                                    updateFilterParams({ name: "cleanliness", value: newValue });
                                    return newValue;
                                });
                            }}
                        >
                            {colors.slice(0, expendCleanliness ? colors.length : 5).map((item, index) => (
                                <FormControlLabel key={index} value={item.name} control={<Radio size="small" />} label={<div className="flex gap-3 items-center"><p>{item.name}</p><p style={{ backgroundColor: item.hex }} className={`h-5 w-5 rounded-full ${item.name == "Lavender" ? "border" : ""}`}></p></div>} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <div>
                        <button onClick={() => setExpendCleanliness(!expendCleanliness)} className="text-[var(--primary-color)]  hover:text-[#004494] cursor-pointer">
                            {expendCleanliness ? <>hide</> : <>+ {colors.length - 5} more</>}
                        </button>
                    </div>
                </section>
            </div>

            {/* Price */}
            <div className="px-9 space-y-6 py-4">
                <section>
                    <FormControl>
                        <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", color: "var(--primary-color)", paddingBottom: "3px" }} className="text-2xl font-semibold" id="price">Price</FormLabel>
                        <RadioGroup
                            aria-labelledby="price"
                            // defaultValue=""
                            name="price"
                            value={priceRadio}
                            onClick={(e) => {
                                const value = e.target.value;
                                setPriceRadio((prev) => {
                                    const newValue = prev === value ? "" : value; // toggle: if same -> clear, else -> set
                                    console.log(newValue)
                                    updateFilterParams({ name: "price", value: newValue });
                                    return newValue;
                                });
                            }}
                        >
                            {price.slice(0, expendPrice ? price.length : 5).map((item, index) => (
                                <FormControlLabel key={index} value={item.value} control={<Radio size="small" />} label={item.name} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <div>
                        <button onClick={() => setExpendPrice(!expendPrice)} className="text-[var(--primary-color)]  hover:text-[#004494] cursor-pointer">
                            {expendPrice ? <>hide</> : <>+ {price.length - 5} more</>}
                        </button>
                    </div>
                </section>
            </div>

            {/* Brand */}
            {/* <div className="px-9 space-y-6 py-4">
        <section>
          <FormControl>
            <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", color: "var(--primary-color)", paddingBottom: "3px" }} className="text-2xl font-semibold" id="brand">Brand</FormLabel>
            <RadioGroup
              aria-labelledby="brand"
              // defaultValue=""
              value={brandRadio}
              name="brand"
              onClick={(e) => {
                const value = e.target.value;
                setBrandRadio((prev) => {
                  const newValue = prev === value ? "" : value;
                  updateFilterParams({ name: "brand", value: newValue });
                  return newValue;
                });
              }}
            >
              {brand.slice(0, expendBrand ? brand.length : 5).map((item, index) => (
                <FormControlLabel key={index} value={item.value} control={<Radio size="small" />} label={item.name} />
              ))}
            </RadioGroup>
          </FormControl>
          <div>
            <button onClick={() => setExpendBrand(!expendBrand)} className="text-[var(--primary-color)]  hover:text-[#004494] cursor-pointer">
              {expendBrand ? <>hide</> : <>+ {brand.length - 5} more</>}
            </button>
          </div>
        </section>
      </div> */}

            {/* Discount */}
            <div className="px-9 space-y-6 py-4">
                <section>
                    <FormControl>
                        <FormLabel sx={{ fontSize: "16px", fontWeight: "bold", color: "var(--primary-color)", paddingBottom: "3px" }} className="text-2xl font-semibold" id="color">Discount</FormLabel>
                        <RadioGroup
                            aria-labelledby="discount"
                            // defaultValue=""
                            value={discountRadio}
                            name="discount"
                            onClick={(e) => {
                                const value = e.target.value;
                                setDiscountRadio((prev) => {
                                    const newValue = prev === value ? "" : value;
                                    updateFilterParams({ name: "discount", value: newValue });
                                    return newValue;
                                });
                            }}
                        >
                            {discount.slice(0, expendDiscount ? discount.length : 5).map((item, index) => (
                                <FormControlLabel key={index} value={item.value} control={<Radio size="small" />} label={item.name} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <div>
                        <button onClick={() => setExpendDiscount(!expendDiscount)} className="text-[var(--primary-color)]  hover:text-[#004494] cursor-pointer">
                            {expendDiscount ? <>hide</> : <>+ {discount.length - 5} more</>}
                        </button>
                    </div>
                </section>
            </div>

        </div>
    )
}

export default FilterSection;
