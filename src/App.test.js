import React from "react";
import { render, waitForDomChange } from "@testing-library/react";
import App from './App';

describe("App component", () => {
  test("render N/A on initialization", async () => {
    let { getByTestId, rerender } = render(<App />);
    const tempSpan = getByTestId("temp-val");
    const pressSpan = getByTestId("press-val");
    const humSpan = getByTestId("hum-val");
    expect(tempSpan.textContent).toBe("N/A");
    expect(pressSpan.textContent).toBe("N/A");
    expect(humSpan.textContent).toBe("N/A");
    await waitForDomChange(tempSpan);
    await waitForDomChange(pressSpan);
    await waitForDomChange(humSpan);
    rerender();
    expect(tempSpan.textContent).toBe("22");
    expect(pressSpan.textContent).toBe("1000");
    expect(humSpan.textContent).toBe(45); 
  });
});
