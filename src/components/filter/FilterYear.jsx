import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function FilterYear({
    minimumYear,
    maximumYear,
    setMinimumYear,
    setMaximumYear,
}) {
    const thisYear = new Date().getFullYear() + 1;
    const handleSlider = (e) => {
        setMinimumYear(e[0]);
        setMaximumYear(e[1]);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-2 w-4/5 mx-auto my-2">
            <h4>
                {minimumYear} - {maximumYear}
            </h4>
            <div className="w-full">
                <Slider
                    range
                    allowCross={false}
                    min={1888}
                    max={thisYear}
                    value={[minimumYear, maximumYear]}
                    defaultValue={[minimumYear, maximumYear]}
                    onChange={(ev) => handleSlider(ev)}
                />
            </div>
        </div>
    );
}

export default FilterYear;
