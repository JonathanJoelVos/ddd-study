import { Slug } from "./slug";
import { expect, describe, it } from "vitest";

describe("Slug", () => {
  it("should be able to create a slug", () => {
    const slug = Slug.createFromText("An example slug");

    expect(slug.value).toEqual("an-example-slug");
  });
});
