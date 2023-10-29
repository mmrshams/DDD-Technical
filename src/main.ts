import { AppModule } from './app.module';
import { HttpIngressBootstrap } from './ingress/http';


// ingress bounding
HttpIngressBootstrap(AppModule);
