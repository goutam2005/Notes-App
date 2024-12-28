"use client";

import { createContext, useState } from "react";

const Contextnote = createContext();

function Notes({ children }) {
  const [note, setnote] = useState([]);
 

  return (
    <div>
      <Contextnote.Provider value={{ note, setnote }}>
        {children}
      </Contextnote.Provider>
    </div>
  );
}

export { Notes, Contextnote };
