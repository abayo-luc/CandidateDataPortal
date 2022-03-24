import React from 'react';
import * as Location from 'expo-location';

type RecordingStateType = 'paused' | 'recording' | 'none';
interface Props {}
interface RecordingContextType {
  recordingState: RecordingStateType;
  changeRecordingState: (
    status: RecordingStateType
  ) => void;
  discardRecording: () => void;
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
export const RecordingProvider: React.FC<Props> = ({
  children,
}) => {
  const [recordingState, setRecordingState] =
    React.useState<RecordingStateType>('none');

  const changeRecordingState = (
    state: RecordingStateType
  ) => {
    setRecordingState(state);
  };

  const discardRecording = () => {
    setRecordingState('none');
  };

  const memoValue = React.useMemo(
    () => ({
      recordingState,
      changeRecordingState,
      discardRecording,
    }),
    [recordingState]
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
