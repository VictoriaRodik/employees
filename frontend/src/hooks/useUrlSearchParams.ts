import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

type Params = Record<
  string,
  string | number | boolean | (string | number | boolean)[] | null | undefined
>;

export const useUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setUrlSearchParams = useCallback(
    (params: Params) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        for (const paramName in params) {
          const paramValue = params[paramName];

          if (
            paramValue === undefined ||
            paramValue === null ||
            (Array.isArray(paramValue) && paramValue.length === 0)
          ) {
            newParams.delete(paramName);
            continue;
          }

          const valueAsString = Array.isArray(paramValue)
            ? paramValue.join(",")
            : String(paramValue);

          newParams.set(paramName, valueAsString);
        }

        return newParams;
      });
    },
    [setSearchParams]
  );

  return { searchParams, setUrlSearchParams };
};
