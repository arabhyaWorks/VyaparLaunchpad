import React, { FunctionComponent, useMemo, CSSProperties } from "react";
import voiceImg from "../../../assets/SelectMethod/voiceImg.svg";
import inputImg from "../../../assets/SelectMethod/InputIcon.svg";

export type GroupComponentType = {
  className?: string;
  voiceFirst?: string;
  useVoiceFeatureToInputYou?: string;
  group1000004811?: string;
  group1000004811_1?: string;
  group?: "voice" | "onboarding";

  propFlex?: CSSProperties["flex"];

  onGroupClick: (group: "voice" | "onboarding") => void;
};

const GroupComponent: FunctionComponent<GroupComponentType> = ({
  className = "",
  voiceFirst,
  useVoiceFeatureToInputYou,
  group1000004811,
  propFlex,
  onGroupClick,
  group,
}) => {
  const groupDivStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
    };
  }, [propFlex]);

  const handleClick = () => {
    if (onGroupClick && group) {
      onGroupClick(group);
    }
  };

  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-md ${className}`}
      style={groupDivStyle}
    >
      <div className="mb-4">
        <b className="text-lg font-bold">{voiceFirst}</b>
      </div>
      {/* <div className="mb-4">{useVoiceFeatureToInputYou}</div> */}
      <div className="flex justify-center items-center">
        <img
          className="cursor-pointer"
          loading="lazy"
          alt=""
          src={group1000004811}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

type SelectMethodProps = {
  onGroupClick: (group: "voice" | "onboarding") => void;
};

// Root component definition
const SelectMethod: FunctionComponent<SelectMethodProps> = ({
  onGroupClick,
}) => {
  return (
    <div className="flex flex-col items-center  p-8">
      <div className="flex justify-center items-center space-x-8 w-full">
        <GroupComponent
          className="flex-1"
          voiceFirst="Voice First"
          // useVoiceFeatureToInputYou="Use voice feature to input your shop details."
          group1000004811={voiceImg}
          group="voice"
          onGroupClick={onGroupClick}
        />
        <GroupComponent
          className="flex-1"
          voiceFirst="Input Shop Details"
          // useVoiceFeatureToInputYou="Input your shop details manually by keyboard."
          group1000004811={inputImg}
          propFlex="1"
          group="onboarding"
          onGroupClick={onGroupClick}
        />
      </div>
    </div>
  );
};

export default SelectMethod;
