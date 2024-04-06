"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
export default function AddBook() {
  const route = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/novel", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    if (response.status == 200) {
      const bookId = data.bookId;
      const message = "Success! BookID is " + bookId;
      alert(message);
      route.push("/admin");
    } else {
      alert(data.error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Button color="blue" onClick={() => route.push("/admin")}>
        Return to Manage Book View
      </Button>
      <form onSubmit={handleSubmit} className="flex  flex-col gap-4 w-96">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookName" value="Book name" />
          </div>
          <TextInput
            id="bookName"
            type="text"
            name="bookName"
            placeholder="input book name"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="author" value="Author" />
          </div>
          <TextInput
            id="author"
            type="text"
            placeholder="input author"
            name="author"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="cover" value="Cover" />
          </div>
          <TextInput
            id="cover"
            placeholder="input cover link or submit image file"
            type="text"
            name="cover"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Type" value="Type" />
          </div>
          <TextInput id="Type" type="text" name="type" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Tags" value="Tags" />
          </div>
          <TextInput
            id="Tags"
            placeholder="Input tags, split by comma"
            type="text"
            name="tags"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Description" />
          </div>
          <TextInput id="description" type="text" name="description" required />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
