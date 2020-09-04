import React, { useState } from "react";
import { DetailsList, CheckboxVisibility, DayOfWeek, Button, IDatePickerStrings } from "@fluentui/react";
import {
  useQueriesReport,
  QueriesReportFragmentTypes,
  SystemQueriesReportQueryTypes,

} from "@umk/statistic-client-relay";
import { PeriodDatePicker, CodeModal, CodeTextProps, HiddenText } from "../../baseComponents";

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',

  isRequiredErrorMessage: 'Field is required.',

  invalidInputErrorMessage: 'Invalid date format.',
};

const firstDayOfWeek = DayOfWeek.Sunday;



export type ResultTypeTableProps = {
  system: NonNullable<SystemQueriesReportQueryTypes.SystemQueriesReportQueryResponse["system"]>,
};

type IDocument = QueriesReportFragmentTypes.QueriesReportFragment["queriesReport"][0];

export function QueriesReportTable({ system }: ResultTypeTableProps): JSX.Element {


  const [{ queriesReport }, refetch] = useQueriesReport(system);

  const [dates, setDates] = useState<[Date | null | undefined, Date | null | undefined]>([undefined, undefined]);

  const onSelectDate = (dates: [Date | null | undefined, Date | null | undefined]) => {

    setDates(dates);

  }
  const onButonClick = (e: React.MouseEvent<Button>) => {
    refetch({
      begin: dates[0],
      end: dates[1],
      id: system.id,
    }, { fetchPolicy: "store-and-network" });
  }

  const [visibleModal, setVisibleModal] = useState(false);
  const [codeText, setCodeText] = useState<CodeTextProps>({
    language: 'graphql',
    text: '',
  });

  return (
    <>
      <CodeModal
        codeText={codeText}
        onCancel={() => { setVisibleModal(false); }}
        visible={visibleModal}
      />
      <PeriodDatePicker
        placeholders={["СТАРТ ПЕРИОДА", "КОНЕЦ ПЕРИОДА"]}
        orientation="horizontal"
        className="QueriesReportTable-DatePicker"
        allowTextInput={true}
        firstDayOfWeek={firstDayOfWeek}
        strings={DayPickerStrings}
        value={dates}
        onSelectDate={onSelectDate} />
      <Button className="QueriesReportTable-UpdateButton" onClick={onButonClick} >Загрузить отчет</Button>
      <DetailsList
        className="QueriesReportTable"
        items={queriesReport.map<IDocument>((val) => ({
          count: val.count,
          average: val.average,
          query: val.query,
        }))}
        disableSelectionZone={true}
        compact={true}
        checkboxVisibility={CheckboxVisibility.hidden}

        columns={[
          {
            key: 'column1',
            name: 'query',
            className: "CellQuery",
            fieldName: 'query',
            minWidth: 400,
            maxWidth: 600,
            data: "string",
            isPadded: true,
            onRender: (item: IDocument) => {
              const onClick = () => {
                setCodeText({
                  language: 'graphql',
                  text: item.query,
                });
                setVisibleModal(true);
              };
              return (<HiddenText onClick={onClick} fullText={item.query} />)
            },
          },
          {
            key: 'column2',
            name: 'Количество',
            className: "CellCount",
            fieldName: 'count',
            minWidth: 150,
            maxWidth: 300,
            isPadded: true,
            data: "number",
          },
          {
            key: 'column2',
            name: 'Среднее время',
            className: "CellAverage",
            fieldName: 'average',
            minWidth: 150,
            maxWidth: 300,
            isPadded: true,
            data: "number",
          }
        ]}
      >
      </DetailsList>
      

    </>
  );

}
