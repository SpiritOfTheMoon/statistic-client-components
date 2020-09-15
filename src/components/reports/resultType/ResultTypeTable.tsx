import React from "react";
import { DetailsList, CheckboxVisibility } from "@fluentui/react";
import {
  ResultTypeReportFragmentTypes,

} from "@umk-stat/statistic-client-relay";




export type ResultTypeTableProps = {
  data: ResultTypeReportFragmentTypes.ResultTypeReportFragment["resultTypeReport"];
};

type IDocument = ResultTypeReportFragmentTypes.ResultTypeReportFragment["resultTypeReport"][0];

export function ResultTypeTable({ data }: ResultTypeTableProps): JSX.Element {


  return (
    <>
      <DetailsList
        className="ResultTypeTable"
        items={data.map<IDocument>((val) => ({
          count: val.count,
          name: val.name,
        }))}
        disableSelectionZone={true}
        compact={true}
        checkboxVisibility={CheckboxVisibility.hidden}

        columns={[
          {
            key: 'column1',
            name: 'Тип результата',
            className: "CellName",
            fieldName: 'name',
            minWidth: 200,
            maxWidth: 300,
            data: "string",
          },
          {
            key: 'column2',
            name: 'Количество',
            className: "CellCount",
            fieldName: 'count',
            minWidth: 150,
            isPadded: true,
            data: "number",
          }
        ]}
      >
      </DetailsList>


    </>
  );

}
