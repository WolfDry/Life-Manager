import React, { ReactElement } from "react"

export type Page = {
  label: string
  display: () => React.JSX.Element
}