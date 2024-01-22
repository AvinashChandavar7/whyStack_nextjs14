"use server"

import { SearchParams } from './shared.types'

import User from "@/database/user.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";

const SearchableTypes = ["question", "answer", "tag", "user"];

export async function globalSearch(params: SearchParams) {
  try {
    //
    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Question, searchField: 'title', type: 'question' },
      { model: Answer, searchField: 'content', type: 'answer' },
      { model: User, searchField: 'name', type: 'user' },
      { model: Tag, searchField: 'name', type: 'tag' },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // SEARCH ACROSS EVERYTHING


      /**  This ok code but this Rookie mistake (ForEach , Map)
       *** if You want to read the files in sequence , you cannot use forEach indeed .
       *   just use a  modern for _of loop instead in which await will work as expected:
       // modelsAndTypes.forEach(async(item) => {
       //   const queryResults = await modelsAndTypes.find()
       // })
       */

      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title: type === 'answer'
              ? `Answers containing ${query}`
              : item[searchField],

            type,

            id: type === 'user'
              ? item.clerkId
              : type === 'answer'
                ? item.questionId
                : item._id
          })
          )
        )
      }



    } else {
      // SEARCH IN THE SPECIFIED MODEL TYPE

      const modelInfo = modelsAndTypes.find(
        (item) => item.type === type
      );


      console.log({ modelInfo })

      if (!modelInfo) {
        throw new Error('Invalid Search Type');
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8)

      results = queryResults.map((item) => (
        {
          title: type === 'answer'
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],

          type,

          id: type === 'user'
            ? item.clerkId
            : type === 'answer'
              ? item.questionId
              : item._id
        }
      ))


    }

    return JSON.stringify(results);

  } catch (error) {
    console.log(`Error fetching Global Search Results: ${error}`)
    throw error;
  }
}