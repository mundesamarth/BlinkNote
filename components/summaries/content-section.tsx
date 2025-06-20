"use client";

import { containerVariants, itemVariants } from "@/utils/constants";
import { MotionDiv } from "../common/motion-wrapper";

function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);
  const isEmojiRegex = /[\u{1F300}-\u{1F9FF}] | [\u{2600}-\u{26FF}]/u;
  const hasEmoji = isEmojiRegex.test(point);
  const isEmpty = !point.trim();
  return {
    isNumbered,
    isMainPoint,
    isEmpty,
    hasEmoji,
  };
}
function parseEmojiPoints(content: string) {
  const cleanContent = content.replace(/^[•]\s*/, "").trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);

  if (!matches) return null;

  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}

const EmojiPoint = ({ point }: { point: string }) => {
  const { emoji, text } = parseEmojiPoints(point) ?? {};
  return (
    <MotionDiv variants={itemVariants} className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inet-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
    </MotionDiv>
  );
};
const RegularPoint = ({ point }: { point: string }) => {
  return (
    <MotionDiv variants={itemVariants} className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="absolute inet-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <p className="relative text-lg lg:text-xl text-shadow-muted-foreground/90 leading-relaxed text-left">
        {point}
      </p>
    </MotionDiv>
  );
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <MotionDiv variants={containerVariants} key={points.join('')} initial="hidden" animate="visible" exit="exit"className="space-y-4">
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, isEmpty, hasEmoji } =
          parsePoint(point);
        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={`point-${index}`} point={point} />;
        }
        return <RegularPoint key={`point-${index}`} point={point} />;
      })}
    </MotionDiv>
  );/*  */
}
