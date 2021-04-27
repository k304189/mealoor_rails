import { memo, VFC } from "react";

import { SignoutHeaderLayout } from "../../templates/SignoutHeaderLayout";

export const Top: VFC = memo(() => {
  localStorage.clear();
  console.log(localStorage);
  return (
    <SignoutHeaderLayout>
      <div>
        <h1>Top画面です</h1>
      </div>
    </SignoutHeaderLayout>
  )
})
