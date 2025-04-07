import { Company } from '@/types/api';
import { Badge } from '@/components/ui/badge';
import { Globe, Calendar, Gamepad } from 'lucide-react';

const CompanyHeader = ({ company, gamesCount }: { company: Company; gamesCount: number }) => (
  <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
    <div className="w-32 h-32 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
      {company.imageUrl ? (
        <img 
          src={company.imageUrl} 
          alt={company.name} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-muted-foreground text-4xl font-bold">
          {company.name.charAt(0)}
        </div>
      )}
    </div>
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="flex items-center gap-1">
          <Globe className="h-3 w-3" />
          {company.country}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Gamepad className="h-3 w-3" />
          {gamesCount} Games
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Founded {new Date(company.createdAt).getFullYear()}
        </Badge>
      </div>
      <p className="text-muted-foreground">
        {company.name} is a game development company based in {company.country}.
      </p>
    </div>
  </div>
);

export default CompanyHeader; 