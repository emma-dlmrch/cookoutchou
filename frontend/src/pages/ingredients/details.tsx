import React from "react";

import { Ingredient, Unit, SeasonalMonth } from "../../models";
import { useState } from "react";
import { useEffect } from "react";

function UnitsList({ units }: { units: Unit[] }) {
    return (
        <ul>
            {units.map((unit) => {
                return <li>{unit.name}</li>;
            })}
        </ul>
    );
}
function MonthsList({ months }: { months: SeasonalMonth[] }) {
    return (
        <p>
            {months
                .map((unit) => {
                    return unit.name;
                })
                .join(",")}
        </p>
    );
}

function IngredientDetails({ ingredientId }: { ingredientId?: number }) {
    const [data, setData] = useState<Ingredient>();

    const getData = () => {
        const kg: Unit = {
            id: 1,
            name: "kg",
        };
        const g: Unit = {
            id: 1,
            name: "g",
        };
        const january: SeasonalMonth = {
            id: 1,
            name: "January",
        };
        const patate: Ingredient = {
            id: 1,
            name: "Patate",
            slug: "patate",
            units: [kg, g],
            months: [january],
        };
        setData(patate);
    };

    useEffect(() => getData(), [ingredientId]);

    if (!data) {
        return <div>Aucune donnée disponible.</div>;
    }
    return (
        <div className="App">
            <p>Nom : {data.name}</p>
            <p>Unités :</p>
            {data.units && <UnitsList units={data.units} />}
            <p>Saisonnalité : </p>
            {data.months && <MonthsList months={data.months} />}
        </div>
    );
}

export default IngredientDetails;
