import Sentiment from "sentiment";

const sentiment = new Sentiment();

function analyze(text){
    const suggestions = [];

    const words = text.split(" ");
    const wordCount = words.length;

    const hashtags = text.match(/#\w+/g) || [];
    const containsCTA = /(follow|comment|share|dm|click)/i.test(text);
    const containsQuestion = text.includes("?");

    const sentimentResult = sentiment.analyze(text);

    if (wordCount < 20)
        suggestions.push("Post is too short. Expand content.");

    if (hashtags.length === 0)
        suggestions.push("Add 3-5 relevant hashtags.");

    if (!containsCTA)
        suggestions.push("Include a call-to-action.");

    if (!containsQuestion)
        suggestions.push("Try adding a question to boost engagement.");

    if (sentimentResult.score < 0)
        suggestions.push("Tone appears negative. Consider positive language.");

    return {
        wordCount,
        hashtagCount: hashtags.length,
        CTACount: containsCTA,
        sentiment: sentimentResult.score,
        suggestions
    };
};


export default analyze;
