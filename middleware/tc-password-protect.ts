
export default function(ctx: any) {
    if((/true/i).test(ctx.env.lockEnabled)){
        if (ctx.route.path === '/unlock' || ctx.$passwordProtect.isAuthorised()) {
            return true
        }
        if(!ctx.$passwordProtect.checkUserIfRedirect() === true){
            ctx.redirect({ name: 'unlock'});
        }
        return;
    } else {
        return true
    }
}
