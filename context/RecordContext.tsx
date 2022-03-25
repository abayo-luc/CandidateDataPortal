import React, { useState } from 'react';

type RecordingStateType = 'paused' | 'recording' | 'none';
interface Props {}
interface RecordingContextType {
  recordingState: RecordingStateType;
  changeRecordingState: (
    status: RecordingStateType
  ) => void;
  discardRecording: () => void;
  farmData: { [key: string]: any };
  setFarmData: (values: { [key: string]: any }) => void;
}

/**
 * @description recording context
 */
export const RecordingContext =
  React.createContext<RecordingContextType>(
    {} as RecordingContextType
  );

/**
 * @description recording provider
 * @param param0
 * @returns
 */
const InitialFarmData = {
  year: '',
  season: '',
  crop: '',
  quantity: '',
  unit: '',
  label: '',
  size: '',
  sizeUnit: 'sqm',
  coordinates: [],
};
export const RecordingProvider: React.FC<Props> = ({
  children,
}) => {
  const [recordingState, setRecordingState] =
    React.useState<RecordingStateType>('none');
  const [farmData, setFarmData] = useState<{
    [key: string]: any;
  }>({
    year: '',
    season: '',
    crop: '',
    quantity: '',
    unit: '',
  });
  const changeRecordingState = (
    state: RecordingStateType
  ) => {
    setRecordingState(state);
  };

  const discardRecording = () => {
    setRecordingState('none');
    setFarmData(InitialFarmData);
  };

  const handleFarmData = (data: { [key: string]: any }) => {
    setFarmData((state) => ({ ...state, ...data }));
  };

  const memoValue = React.useMemo(
    () => ({
      recordingState,
      changeRecordingState,
      discardRecording,
      farmData,
      setFarmData: handleFarmData,
    }),
    [recordingState, farmData]
  );
  return (
    <RecordingContext.Provider value={memoValue}>
      {children}
    </RecordingContext.Provider>
  );
};

/**
 * @description recording hook
 */

export const useRecording = () => {
  return React.useContext(RecordingContext);
};
