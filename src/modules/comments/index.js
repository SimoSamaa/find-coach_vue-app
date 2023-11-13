import commentsMutations from './mutations';
import commentsActions from './actions';
import commentsGetters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      comments: [

      ]
    };
  },
  mutations: commentsMutations,
  actions: commentsActions,
  getters: commentsGetters,
};




// {
//   name: 'Mohamed',
//   date: Date.now(),
//   comment: 'It is good experience since I have explored or practiced the tailwind css projects by implementing different methods of tailwind css'
// },
// {
//   name: 'Achraf',
//   date: Date.now(),
//   comment: 'It was OK. You can easily learn tailwind through this course. Sometimes I feel that the teacher just read everything from another screen and wrote the code directly into VS code. Sometimes he used classes that did not affect on elements at all.Personally, what I missed in this course are the exercises/assignments that the teacher could just give us in between.'
// },
// {
//   name: 'Osama',
//   date: Date.now(),
//   comment: "Pretty great course over all. It's great for learning through projects and gives you lots of experience styling formatting your webpage! I'm waay more capable now of styling a page to how I want it!Having said that, the course isn't perfect. Usually once to several times per project, he throws in unnecessary classes that do nothing (e.g. in mini-project image gallery, there's class on a button that had no special font already assigned to it)or sometimes aren't even real tailwind classes. Another bugging thing is (this one may be intentional for practice's sake) he'll take very verbose approach to doing something, that requires maybe 5x more code or classes It's not a deal breaker, but it's just annoying to have coming from your professional instructor never experienced a course that had this much junk/filler code making it to the final product. ...but disregarding these things, the course teaches you well, so I do recommend it. Just be prepared for what feels like a one-take/non-(author)reviewed course"
// },
// {
//   name: 'Karima',
//   date: Date.now(),
//   comment: "Pretty great course over all. It's great for learning through projects and gives you lots of experience styling formatting your webpage! I'm waay more capable now of styling a page to how I want it!Having said that, the course isn't perfect. Usually once to several times per project, he throws in unnecessary classes that do nothing (e.g. in mini-project image gallery, there's class on a button that had no special font already assigned to it)or sometimes aren't even real tailwind classes. Another bugging thing is (this one may be intentional for practice's sake) he'll take very verbose approach to doing something, that requires maybe 5x more code or classes It's not a deal breaker, but it's just annoying to have coming from your professional instructor never experienced a course that had this much junk/filler code making it to the final product. ...but disregarding these things, the course teaches you well, so I do recommend it. Just be prepared for what feels like a one-take/non-(author)reviewed course"
// }