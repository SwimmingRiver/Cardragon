import { useCallback,useState } from "react";

export const useInput=(initialState = null) => {
    const [state, setState] = useState(initialState);
    const handler = useCallback((e) => {
      setState(e.target.value);
    }, []);
    return [state, handler, setState];
};