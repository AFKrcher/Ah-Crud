exports.seed = function (knex) {
    return knex.schema.dropTableIfExists('list')
    .then(() => 
    {
        return knex.schema.createTable('list', (list) => 
        {
            list.increments();
            list.string('title');
            list.string('body')
        });
    })
    .then(() => 
    {
        return knex('list').insert([
            { title: "1. Click on this title! *NOT CLICKBAIT*", body: "Go for it! \n 2. Now click the edit button! \n 3. Refresh to confirm persistence. \n 4.) Then delete!" },
            { title: "5. Then click on this title", body: "What's the checklist again? \n Create ✔️ \n Read ✔️ \n Edit ✔️ \n Delete ✔️"},
            { title: "You WONT believe what happened today...", body: "So Jessica asked Tommy to prom EVEN THOUGH she knows that he was going to ask ME out. Then I got a B on my homework assignment. This is literally the worst day ever."},
            { title: "This is my website", body: "Don't vandalize it 👿"},
            { title: "Lorem Ipsum", body: "Lorem ipsum veni vidi vici ad hoc infinitum" }
        ]);
    });
}