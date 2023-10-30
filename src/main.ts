import { AppModule } from './app.module';
import { HttpIngressBootstrap } from './ingress/http';


// ingress bounding
HttpIngressBootstrap(AppModule);


// [TODO]
// 2. add userId validation [done]
// 3. fix logic error and add proper repo functions [done]
// 3. create user during authentication [done]
// 6. add versioning [done]
// 7. hash password [done]
// 1.show Proper Error [done]
// 4. check solution Algo and refactoring there  [done]
// 5. enable linter

// 8. nice to have <merge Repositories>